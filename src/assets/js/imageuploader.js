import jQuery from'jquery'

(function($) {
  $.fn.uploader = function(options) {
    return this.each(function(index) {
      options = $.extend({
        submitButtonCopy: 'Enviar Fotos selecionados',
        furtherInstructionsCopy: 'Você também pode',
        selectButtonCopy: 'Selecione as Fotos',
        secondarySelectButtonCopy: 'Selecione mais fotos',
        dropZone: $(this),
        fileTypeWhiteList: ['jpg', 'png', 'jpeg', 'gif', 'pdf'],
        badFileTypeMessage: 'Desculpe, não podemos aceitar este tipo de foto.',
        // ajaxUrl: 'http://localhost:3000/albums',
        ajaxUrl: 'https://brezan.herokuapp.com/albums',
        testMode: false
      }, options);

      var state = {
        fileBatch: [],
        isUploading: false,
        isOverLimit: false,
        listIndex: 0
      };

      // create DOM elements
      var dom = {
        uploaderBox: $(this),
        submitButton: $(
          '<div class="row mt-4">'+
          '<div class="col-md-12">'+
          '<div class="card">'+
          '<div class="card-header">'+
          '<span class="font-weight-bolder mr-4 h4">4º</span> Salvar Album'+
          '</div>'+
          '<div class="card-body">'+
          '<button class="js-uploader__submit-button uploader__submit-button uploader__hide btn btn-success" id="submitButton" disabled="true">' +
          options.submitButtonCopy + '</button></div></div></div></div>'),


        selectButton: $(
          '<div class="row mt-4">'+
          '<div class="col-md-12">'+
          '<div class="card">'+
          '<div class="card-header">'+
          '<span class="font-weight-bolder mr-4 h4">5º</span> Selecionar fotos do album'+
          '</div>'+
          '<div class="card-body">'+
          '<input style="height: 0; width: 0;" id="fileinput' + index + '" type="file" multiple class="js-uploader__file-input uploader__file-input">' +
          '<label for="fileinput' + index + '" style="cursor: pointer;" class="js-uploader__file-label uploader__file-label btn btn-info">' +
          options.selectButtonCopy + '</label></div></div></div></div>'),

        secondarySelectButton: $('<input style="height: 0; width: 0;" id="secondaryfileinput' + index + '" type="file"' +
          ' multiple class="small mt-5 js-uploader__file-input uploader__file-input"> ' +
          '<label for="secondaryfileinput' + index + '" style="cursor: pointer;" class="js-uploader__file-label uploader__file-label uploader__file-label--secondary btn btn-sm btn-secondary">' +
          options.secondarySelectButtonCopy + '</label>'),

        fileList: $('<ul class="list-unstyled  align-middle js-uploader__file-list uploader__file-list"></ul>'),
        contentsContainer: $('<div class="js-uploader__contents uploader__contents"></div>'),
        furtherInstructions: $('<p class="js-uploader__further-instructions uploader__further-instructions uploader__hide">' + options.furtherInstructionsCopy + '</p>')
      };

      // empty out whatever is in there
      dom.uploaderBox.empty();

      // create and attach UI elements
      setupDOM(dom);

      // set up event handling
      bindUIEvents();

      function setupDOM(dom) {
        dom.contentsContainer
          .append(dom.selectButton);
        dom.furtherInstructions
          .append(dom.secondarySelectButton);
        dom.uploaderBox
          .append(dom.contentsContainer)
          .append(dom.fileList)
          .append(dom.submitButton)
          .after(dom.furtherInstructions);
      }

      function bindUIEvents() {
        // handle drag and drop
        options.dropZone.on('dragover dragleave', function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
        options.dropZone.on('drop', selectFilesHandler);

        // hack for being able selecting the same file name twice
        dom.selectButton.on('click', function() {
          this.value = null;
          document.getElementById('submitButton').disabled = false;
        });
        dom.selectButton.on('change', selectFilesHandler);
        dom.secondarySelectButton.on('click', function() {
          this.value = null;
        });
        dom.secondarySelectButton.on('change', selectFilesHandler);

        // handle the submit click
        dom.submitButton.on('click', function () {
          $.blockUI({ message: '<h1 class="mb-4"><i class="fa fa-exclamation"></i></h1><h2>aguarde um momento...</h2><h5 class="text-warning ">dependendo da quandidade de fotos, esse processo pode demorar um pouco...</h5>' });
        });

        dom.submitButton.on('click', uploadSubmitHandler);

        // remove link handler
        dom.uploaderBox.on('click', '.js-upload-remove-button', removeItemHandler);

        // expose handlers for testing
        if (options.testMode) {
          options.dropZone.on('uploaderTestEvent', function(e) {
            switch (e.functionName) {
              case 'selectFilesHandler':
                selectFilesHandler(e);
                break;
              case 'uploadSubmitHandler':
                uploadSubmitHandler(e);
                break;
              default:
                break;
            }
          });
        }
      }

      function addItem(file) {
        var fileName = cleanName(file.name);
        var fileSize = file.size;
        var id = state.listIndex;
        var sizeWrapper;
        // var fileNameWrapper = $('<span class="uploader__file-list__text">' + fileName + '</span>');

        state.listIndex++;

        var listItem = $('<li class="uploader__file-list__item" data-index="' + id + '"></li>');
        var thumbnailContainer = $('<span class="uploader__file-list__thumbnail"></span>');
        var thumbnail = $('<img class="col-md-2 img-thumbnail"><i class="fa fa-spinner fa-spin uploader__icon--spinner"></i>');
        var removeLink = $('<span class="uploader__file-list__button"><button class="uploader__icon-button js-upload-remove-button fa fa-trash float-right btn btn-outline-danger" data-index="' + id + '"></button></span>');

        // validate the file
        if (options.fileTypeWhiteList.indexOf(getExtension(file.name).toLowerCase()) !== -1) {
          // file is ok, add it to the batch
          state.fileBatch.push({
            file: file,
            id: id,
            fileName: fileName,
            fileSize: fileSize
          });
          sizeWrapper = $('<span class="uploader__file-list__size ml-4 font-weight-bold">' + formatBytes(fileSize) + '</span>');
        } else {
          // file is not ok, only add it to the dom
          sizeWrapper = $('<span class="uploader__file-list__size"><span class="uploader__error">' + options.badFileTypeMessage + '</span></span> hr  ');
        }

        // create the thumbnail, if you can
        if (window.FileReader && file.type.indexOf('image') !== -1) {
          var reader = new FileReader();
          reader.onloadend = function() {
            thumbnail.attr('src', reader.result);
            thumbnail.parent().find('i').remove();
          };
          reader.onerror = function() {
            thumbnail.remove();
          };
          reader.readAsDataURL(file);
        } else if (file.type.indexOf('image') === -1) {
          thumbnail = $('<i class="fa fa-file-o uploader__icon">');
        }

        thumbnailContainer.append(thumbnail);
        listItem.append(thumbnailContainer);

        listItem
          // .append(fileNameWrapper)
          .append(sizeWrapper)
          .append(removeLink)
          .append('<hr>');

        dom.fileList.append(listItem);
      }

      function getExtension(path) {
        var basename = path.split(/[\\/]/).pop();
        var pos = basename.lastIndexOf('.');

        if (basename === '' || pos < 1) {
          return '';
        }
        return basename.slice(pos + 1);
      }

      function formatBytes(bytes, decimals) {
        if (bytes === 0) return '0 Bytes';
        var k = 1024;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
      }

      function cleanName(name) {
        name = name.replace(/\s+/gi, '-'); // Replace white space with dash
        return name.replace(/[^a-zA-Z0-9.]/gi, ''); // Strip any special characters
      }

      function uploadSubmitHandler() {
        if (state.fileBatch.length !== 0) {
          var data = new FormData();
          for (var i = 0; i < state.fileBatch.length; i++) {
            data.append('files[]', state.fileBatch[i].file, state.fileBatch[i].fileName);
          }

          data.append('image', $('#imgInp')[0].files[0])
          data.append('name', $('.title').val())
          data.append('event_id', $('#event').val())

          $.ajax({
            type: 'POST',
            url: options.ajaxUrl,
            data: data,
            cache: false,
            contentType: false,
            processData: false
          }).done(function() {
            window.location.replace("/admin/clients");
          })


        }
      }

      function selectFilesHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!state.isUploading) {
          // files come from the input or a drop
          var files = e.target.files || e.dataTransfer.files || e.dataTransfer.getData;

          // process each incoming file
          for (var i = 0; i < files.length; i++) {
            addItem(files[i]);
          }
        }
        renderControls();
      }

      function renderControls() {
        if (dom.fileList.children().length !== 0) {
          dom.submitButton.removeClass('uploader__hide');
          dom.furtherInstructions.removeClass('uploader__hide');
          dom.contentsContainer.addClass('uploader__hide');
        } else {
          dom.submitButton.addClass('uploader__hide');
          dom.furtherInstructions.addClass('uploader__hide');
          dom.contentsContainer.removeClass('uploader__hide');
        }
      }

      function removeItemHandler(e) {
        e.preventDefault();

        if (!state.isUploading) {
          var removeIndex = $(e.target).data('index');
          removeItem(removeIndex);
          $(e.target).parent().remove();
        }

        renderControls();
      }

      function removeItem(id) {
        // remove from the batch
        for (var i = 0; i < state.fileBatch.length; i++) {
          if (state.fileBatch[i].id === parseInt(id)) {
            state.fileBatch.splice(i, 1);
            break;
          }
        }
        // remove from the DOM
        dom.fileList.find('li[data-index="' + id + '"]').remove();
      }
    });
  };
}(jQuery));
