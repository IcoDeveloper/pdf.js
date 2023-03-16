/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "web-com";
import "web-print_service";
import { RenderingStates, ScrollMode, SpreadMode } from "./ui_utils.js";
import { AppOptions } from "./app_options.js";
import { LinkTarget } from "./pdf_link_service.js";
import { PDFViewerApplication } from "./app.js";

/* eslint-disable-next-line no-unused-vars */
const pdfjsVersion =
  typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_VERSION") : void 0;
/* eslint-disable-next-line no-unused-vars */
const pdfjsBuild =
  typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_BUILD") : void 0;

const AppConstants =
  typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")
    ? { LinkTarget, RenderingStates, ScrollMode, SpreadMode }
    : null;

window.PDFViewerApplication = PDFViewerApplication;
window.PDFViewerApplicationConstants = AppConstants;
window.PDFViewerApplicationOptions = AppOptions;
window.webViewerLoad = webViewerLoad;

function getViewerConfiguration() {
  const appContainer = document.getElementById(
    AppOptions.get("viewerContainerId")
  );
  return {
    appContainer,
    mainContainer: appContainer.getElementsByClassName(
      "pdfjs-viewerContainer"
    )[0],
    viewerContainer: appContainer.getElementsByClassName("pdfjs-viewer")[0],
    toolbar: {
      container: appContainer.getElementsByClassName("pdfjs-toolbarViewer")[0],
      numPages: appContainer.getElementsByClassName("pdfjs-numPages")[0],
      pageNumber: appContainer.getElementsByClassName("pdfjs-pageNumber")[0],
      scaleSelect: appContainer.getElementsByClassName("pdfjs-scaleSelect")[0],
      customScaleOption: appContainer.getElementsByClassName(
        "pdfjs-customScaleOption"
      )[0],
      previous: appContainer.getElementsByClassName("pdfjs-previous")[0],
      next: appContainer.getElementsByClassName("pdfjs-next")[0],
      zoomIn: appContainer.getElementsByClassName("pdfjs-zoomIn")[0],
      zoomOut: appContainer.getElementsByClassName("pdfjs-zoomOut")[0],
      viewFind: appContainer.getElementsByClassName("pdfjs-viewFind")[0],
      openFile: appContainer.getElementsByClassName("pdfjs-openFile")[0],
      print: appContainer.getElementsByClassName("pdfjs-print")[0],
      editorFreeTextButton: appContainer.getElementsByClassName(
        "pdfjs-editorFreeText"
      )[0],
      editorFreeTextParamsToolbar: appContainer.getElementsByClassName(
        "pdfjs-editorFreeTextParamsToolbar"
      )[0],
      editorInkButton:
        appContainer.getElementsByClassName("pdfjs-editorInk")[0],
      editorInkParamsToolbar: appContainer.getElementsByClassName(
        "pdfjs-editorInkParamsToolbar"
      )[0],
      download: appContainer.getElementsByClassName("pdfjs-download")[0],
      undoButton: appContainer.getElementsByClassName("pdfjs-undo")[0],
    },
    secondaryToolbar: {
      toolbar: appContainer.getElementsByClassName("pdfjs-secondaryToolbar")[0],
      toggleButton: appContainer.getElementsByClassName(
        "pdfjs-secondaryToolbarToggle"
      )[0],
      presentationModeButton: appContainer.getElementsByClassName(
        "pdfjs-presentationMode"
      )[0],
      openFileButton: appContainer.getElementsByClassName(
        "pdfjs-secondaryOpenFile"
      )[0],
      printButton: appContainer.getElementsByClassName(
        "pdfjs-secondaryPrint"
      )[0],
      downloadButton: appContainer.getElementsByClassName(
        "pdfjs-secondaryDownload"
      )[0],
      undoButton: appContainer.getElementsByClassName("pdfjs-secondaryUndo")[0],
      viewBookmarkButton:
        appContainer.getElementsByClassName("pdfjs-viewBookmark")[0],
      firstPageButton:
        appContainer.getElementsByClassName("pdfjs-firstPage")[0],
      lastPageButton: appContainer.getElementsByClassName("pdfjs-lastPage")[0],
      pageRotateCwButton:
        appContainer.getElementsByClassName("pdfjs-pageRotateCw")[0],
      pageRotateCcwButton: appContainer.getElementsByClassName(
        "pdfjs-pageRotateCcw"
      )[0],
      cursorSelectToolButton: appContainer.getElementsByClassName(
        "pdfjs-cursorSelectTool"
      )[0],
      cursorHandToolButton: appContainer.getElementsByClassName(
        "pdfjs-cursorHandTool"
      )[0],
      scrollPageButton:
        appContainer.getElementsByClassName("pdfjs-scrollPage")[0],
      scrollVerticalButton: appContainer.getElementsByClassName(
        "pdfjs-scrollVertical"
      )[0],
      scrollHorizontalButton: appContainer.getElementsByClassName(
        "pdfjs-scrollHorizontal"
      )[0],
      scrollWrappedButton: appContainer.getElementsByClassName(
        "pdfjs-scrollWrapped"
      )[0],
      spreadNoneButton:
        appContainer.getElementsByClassName("pdfjs-spreadNone")[0],
      spreadOddButton:
        appContainer.getElementsByClassName("pdfjs-spreadOdd")[0],
      spreadEvenButton:
        appContainer.getElementsByClassName("pdfjs-spreadEven")[0],
      documentPropertiesButton: appContainer.getElementsByClassName(
        "pdfjs-documentProperties"
      )[0],
    },
    sidebar: {
      // Divs (and sidebar button)
      outerContainer: document.getElementById(
        AppOptions.get("viewerContainerId")
      ),
      sidebarContainer: appContainer.getElementsByClassName(
        "pdfjs-sidebarContainer"
      )[0],
      toggleButton: appContainer.getElementsByClassName(
        "pdfjs-sidebarToggle"
      )[0],
      // Buttons
      thumbnailButton: appContainer.getElementsByClassName(
        "pdfjs-viewThumbnail"
      )[0],
      outlineButton:
        appContainer.getElementsByClassName("pdfjs-viewOutline")[0],
      attachmentsButton: appContainer.getElementsByClassName(
        "pdfjs-viewAttachments"
      )[0],
      layersButton: appContainer.getElementsByClassName("pdfjs-viewLayers")[0],
      // Views
      thumbnailView: appContainer.getElementsByClassName(
        "pdfjs-thumbnailView"
      )[0],
      outlineView: appContainer.getElementsByClassName("pdfjs-outlineView")[0],
      attachmentsView: appContainer.getElementsByClassName(
        "pdfjs-attachmentsView"
      )[0],
      layersView: appContainer.getElementsByClassName("pdfjs-layersView")[0],
      // View-specific options
      outlineOptionsContainer: appContainer.getElementsByClassName(
        "pdfjs-outlineOptionsContainer"
      )[0],
      currentOutlineItemButton: appContainer.getElementsByClassName(
        "pdfjs-currentOutlineItem"
      )[0],
    },
    sidebarResizer: {
      outerContainer: document.getElementById(
        AppOptions.get("viewerContainerId")
      ),
      resizer: appContainer.getElementsByClassName("pdfjs-sidebarResizer")[0],
    },
    findBar: {
      bar: appContainer.getElementsByClassName("pdfjs-findbar")[0],
      toggleButton: appContainer.getElementsByClassName("pdfjs-viewFind")[0],
      findField: appContainer.getElementsByClassName("pdfjs-findInput")[0],
      highlightAllCheckbox: appContainer.getElementsByClassName(
        "pdfjs-findHighlightAll"
      )[0],
      caseSensitiveCheckbox: appContainer.getElementsByClassName(
        "pdfjs-findMatchCase"
      )[0],
      matchDiacriticsCheckbox: appContainer.getElementsByClassName(
        "pdfjs-findMatchDiacritics"
      )[0],
      entireWordCheckbox: appContainer.getElementsByClassName(
        "pdfjs-findEntireWord"
      )[0],
      findMsg: appContainer.getElementsByClassName("pdfjs-findMsg")[0],
      findResultsCount: appContainer.getElementsByClassName(
        "pdfjs-findResultsCount"
      )[0],
      findPreviousButton:
        appContainer.getElementsByClassName("pdfjs-findPrevious")[0],
      findNextButton: appContainer.getElementsByClassName("pdfjs-findNext")[0],
    },
    passwordOverlay: {
      dialog: appContainer.getElementsByClassName("pdfjs-passwordDialog")[0],
      label: appContainer.getElementsByClassName("pdfjs-passwordText")[0],
      input: appContainer.getElementsByClassName("pdfjs-password")[0],
      submitButton: appContainer.getElementsByClassName(
        "pdfjs-passwordSubmit"
      )[0],
      cancelButton: appContainer.getElementsByClassName(
        "pdfjs-passwordCancel"
      )[0],
    },
    documentProperties: {
      dialog: appContainer.getElementsByClassName(
        "pdfjs-documentPropertiesDialog"
      )[0],
      closeButton: appContainer.getElementsByClassName(
        "pdfjs-documentPropertiesClose"
      )[0],
      fields: {
        fileName: appContainer.getElementsByClassName("pdfjs-fileNameField")[0],
        fileSize: appContainer.getElementsByClassName("pdfjs-fileSizeField")[0],
        title: appContainer.getElementsByClassName("pdfjs-titleField")[0],
        author: appContainer.getElementsByClassName("pdfjs-authorField")[0],
        subject: appContainer.getElementsByClassName("pdfjs-subjectField")[0],
        keywords: appContainer.getElementsByClassName("pdfjs-keywordsField")[0],
        creationDate: appContainer.getElementsByClassName(
          "pdfjs-creationDateField"
        )[0],
        modificationDate: appContainer.getElementsByClassName(
          "pdfjs-modificationDateField"
        )[0],
        creator: appContainer.getElementsByClassName("pdfjs-creatorField")[0],
        producer: appContainer.getElementsByClassName("pdfjs-producerField")[0],
        version: appContainer.getElementsByClassName("pdfjs-versionField")[0],
        pageCount: appContainer.getElementsByClassName(
          "pdfjs-pageCountField"
        )[0],
        pageSize: appContainer.getElementsByClassName("pdfjs-pageSizeField")[0],
        linearized: appContainer.getElementsByClassName(
          "pdfjs-linearizedField"
        )[0],
      },
    },
    annotationEditorParams: {
      editorFreeTextFontSize: appContainer.getElementsByClassName(
        "pdfjs-editorFreeTextFontSize"
      )[0],
      editorFreeTextColor: appContainer.getElementsByClassName(
        "pdfjs-editorFreeTextColor"
      )[0],
      editorInkColor: appContainer.getElementsByClassName(
        "pdfjs-editorInkColor"
      )[0],
      editorInkThickness: appContainer.getElementsByClassName(
        "pdfjs-editorInkThickness"
      )[0],
      editorInkOpacity: appContainer.getElementsByClassName(
        "pdfjs-editorInkOpacity"
      )[0],
    },
    printContainer: document.getElementsByClassName("pdfjs-printContainer")[0],
    openFileInput: document.getElementsByClassName("pdfjs-fileInput")[0],
    debuggerScriptPath: "./debugger.js",
  };
}

function webViewerLoad(ev, hfReference) {
  const config = getViewerConfiguration();

  if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("GENERIC")) {
    // Give custom implementations of the default viewer a simpler way to
    // set various `AppOptions`, by dispatching an event once all viewer
    // files are loaded but *before* the viewer initialization has run.
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent("webviewerloaded", true, true, {
      source: window,
    });
    try {
      // Attempt to dispatch the event at the embedding `document`,
      // in order to support cases where the viewer is embedded in
      // a *dynamically* created <iframe> element.
      parent.document.dispatchEvent(event);
    } catch (ex) {
      // The viewer could be in e.g. a cross-origin <iframe> element,
      // fallback to dispatching the event at the current `document`.
      console.error(`webviewerloaded: ${ex}`);
      document.dispatchEvent(event);
    }
  }

  if (hfReference) {
    // is call from HybridForms
    PDFViewerApplication.hfReference = hfReference;
    PDFViewerApplication.loadingBar.hide(true);
  }

  return PDFViewerApplication.run(config);
}

// Block the "load" event until all pages are loaded, to ensure that printing
// works in Firefox; see https://bugzilla.mozilla.org/show_bug.cgi?id=1618553
document.blockUnblockOnload?.(true);

if (!window.WinJS) {
  document.addEventListener("DOMContentLoaded", webViewerLoad, true);
}

export {
  PDFViewerApplication,
  AppConstants as PDFViewerApplicationConstants,
  AppOptions as PDFViewerApplicationOptions,
};
