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

function getViewerConfiguration(viewerCtId) {
  const ctElement = document.getElementById(viewerCtId);
  return {
    appContainer: document.getElementById(viewerCtId),
    mainContainer: ctElement.getElementsByClassName("pdfjs-viewerContainer")[0],
    viewerContainer: ctElement.getElementsByClassName("pdfjs-viewer")[0],
    toolbar: {
      container: ctElement.getElementsByClassName("pdfjs-toolbarViewer")[0],
      numPages: ctElement.getElementsByClassName("pdfjs-numPages")[0],
      pageNumber: ctElement.getElementsByClassName("pdfjs-pageNumber")[0],
      scaleSelect: ctElement.getElementsByClassName("pdfjs-scaleSelect")[0],
      customScaleOption: ctElement.getElementsByClassName(
        "pdfjs-customScaleOption"
      )[0],
      previous: ctElement.getElementsByClassName("pdfjs-previous")[0],
      next: ctElement.getElementsByClassName("pdfjs-next")[0],
      zoomIn: ctElement.getElementsByClassName("pdfjs-zoomIn")[0],
      zoomOut: ctElement.getElementsByClassName("pdfjs-zoomOut")[0],
      viewFind: ctElement.getElementsByClassName("pdfjs-viewFind")[0],
      openFile: ctElement.getElementsByClassName("pdfjs-openFile")[0],
      print: ctElement.getElementsByClassName("pdfjs-print")[0],
      editorFreeTextButton: ctElement.getElementsByClassName(
        "pdfjs-editorFreeText"
      )[0],
      editorFreeTextParamsToolbar: ctElement.getElementsByClassName(
        "pdfjs-editorFreeTextParamsToolbar"
      )[0],
      editorInkButton: ctElement.getElementsByClassName("pdfjs-editorInk")[0],
      editorInkParamsToolbar: ctElement.getElementsByClassName(
        "pdfjs-editorInkParamsToolbar"
      )[0],
      download: ctElement.getElementsByClassName("pdfjs-download")[0],
    },
    secondaryToolbar: {
      toolbar: ctElement.getElementsByClassName("pdfjs-secondaryToolbar")[0],
      toggleButton: ctElement.getElementsByClassName(
        "pdfjs-secondaryToolbarToggle"
      )[0],
      presentationModeButton: ctElement.getElementsByClassName(
        "pdfjs-presentationMode"
      )[0],
      openFileButton: ctElement.getElementsByClassName(
        "pdfjs-secondaryOpenFile"
      )[0],
      printButton: ctElement.getElementsByClassName("pdfjs-secondaryPrint")[0],
      downloadButton: ctElement.getElementsByClassName(
        "pdfjs-secondaryDownload"
      )[0],
      viewBookmarkButton:
        ctElement.getElementsByClassName("pdfjs-viewBookmark")[0],
      firstPageButton: ctElement.getElementsByClassName("pdfjs-firstPage")[0],
      lastPageButton: ctElement.getElementsByClassName("pdfjs-lastPage")[0],
      pageRotateCwButton:
        ctElement.getElementsByClassName("pdfjs-pageRotateCw")[0],
      pageRotateCcwButton: ctElement.getElementsByClassName(
        "pdfjs-pageRotateCcw"
      )[0],
      cursorSelectToolButton: ctElement.getElementsByClassName(
        "pdfjs-cursorSelectTool"
      )[0],
      cursorHandToolButton: ctElement.getElementsByClassName(
        "pdfjs-cursorHandTool"
      )[0],
      scrollPageButton: ctElement.getElementsByClassName("pdfjs-scrollPage")[0],
      scrollVerticalButton: ctElement.getElementsByClassName(
        "pdfjs-scrollVertical"
      )[0],
      scrollHorizontalButton: ctElement.getElementsByClassName(
        "pdfjs-scrollHorizontal"
      )[0],
      scrollWrappedButton: ctElement.getElementsByClassName(
        "pdfjs-scrollWrapped"
      )[0],
      spreadNoneButton: ctElement.getElementsByClassName("pdfjs-spreadNone")[0],
      spreadOddButton: ctElement.getElementsByClassName("pdfjs-spreadOdd")[0],
      spreadEvenButton: ctElement.getElementsByClassName("pdfjs-spreadEven")[0],
      documentPropertiesButton: ctElement.getElementsByClassName(
        "pdfjs-documentProperties"
      )[0],
    },
    sidebar: {
      // Divs (and sidebar button)
      outerContainer: document.getElementById("outerContainer"),
      sidebarContainer: ctElement.getElementsByClassName(
        "pdfjs-sidebarContainer"
      )[0],
      toggleButton: ctElement.getElementsByClassName("pdfjs-sidebarToggle")[0],
      // Buttons
      thumbnailButton: ctElement.getElementsByClassName(
        "pdfjs-viewThumbnail"
      )[0],
      outlineButton: ctElement.getElementsByClassName("pdfjs-viewOutline")[0],
      attachmentsButton: ctElement.getElementsByClassName(
        "pdfjs-viewAttachments"
      )[0],
      layersButton: ctElement.getElementsByClassName("pdfjs-viewLayers")[0],
      // Views
      thumbnailView: ctElement.getElementsByClassName("pdfjs-thumbnailView")[0],
      outlineView: ctElement.getElementsByClassName("pdfjs-outlineView")[0],
      attachmentsView: ctElement.getElementsByClassName(
        "pdfjs-attachmentsView"
      )[0],
      layersView: ctElement.getElementsByClassName("pdfjs-layersView")[0],
      // View-specific options
      outlineOptionsContainer: ctElement.getElementsByClassName(
        "pdfjs-outlineOptionsContainer"
      )[0],
      currentOutlineItemButton: ctElement.getElementsByClassName(
        "pdfjs-currentOutlineItem"
      )[0],
    },
    sidebarResizer: {
      outerContainer: document.getElementById("outerContainer"),
      resizer: ctElement.getElementsByClassName("pdfjs-sidebarResizer")[0],
    },
    findBar: {
      bar: ctElement.getElementsByClassName("pdfjs-findbar")[0],
      toggleButton: ctElement.getElementsByClassName("pdfjs-viewFind")[0],
      findField: ctElement.getElementsByClassName("pdfjs-findInput")[0],
      highlightAllCheckbox: ctElement.getElementsByClassName(
        "pdfjs-findHighlightAll"
      )[0],
      caseSensitiveCheckbox: ctElement.getElementsByClassName(
        "pdfjs-findMatchCase"
      )[0],
      matchDiacriticsCheckbox: ctElement.getElementsByClassName(
        "pdfjs-findMatchDiacritics"
      )[0],
      entireWordCheckbox: ctElement.getElementsByClassName(
        "pdfjs-findEntireWord"
      )[0],
      findMsg: ctElement.getElementsByClassName("pdfjs-findMsg")[0],
      findResultsCount: ctElement.getElementsByClassName(
        "pdfjs-findResultsCount"
      )[0],
      findPreviousButton:
        ctElement.getElementsByClassName("pdfjs-findPrevious")[0],
      findNextButton: ctElement.getElementsByClassName("pdfjs-findNext")[0],
    },
    passwordOverlay: {
      dialog: ctElement.getElementsByClassName("pdfjs-passwordDialog")[0],
      label: ctElement.getElementsByClassName("pdfjs-passwordText")[0],
      input: ctElement.getElementsByClassName("pdfjs-password")[0],
      submitButton: ctElement.getElementsByClassName("pdfjs-passwordSubmit")[0],
      cancelButton: ctElement.getElementsByClassName("pdfjs-passwordCancel")[0],
    },
    documentProperties: {
      dialog: ctElement.getElementsByClassName(
        "pdfjs-documentPropertiesDialog"
      )[0],
      closeButton: ctElement.getElementsByClassName(
        "pdfjs-documentPropertiesClose"
      )[0],
      fields: {
        fileName: ctElement.getElementsByClassName("pdfjs-fileNameField")[0],
        fileSize: ctElement.getElementsByClassName("pdfjs-fileSizeField")[0],
        title: ctElement.getElementsByClassName("pdfjs-titleField")[0],
        author: ctElement.getElementsByClassName("pdfjs-authorField")[0],
        subject: ctElement.getElementsByClassName("pdfjs-subjectField")[0],
        keywords: ctElement.getElementsByClassName("pdfjs-keywordsField")[0],
        creationDate: ctElement.getElementsByClassName(
          "pdfjs-creationDateField"
        )[0],
        modificationDate: ctElement.getElementsByClassName(
          "pdfjs-modificationDateField"
        )[0],
        creator: ctElement.getElementsByClassName("pdfjs-creatorField")[0],
        producer: ctElement.getElementsByClassName("pdfjs-producerField")[0],
        version: ctElement.getElementsByClassName("pdfjs-versionField")[0],
        pageCount: ctElement.getElementsByClassName("pdfjs-pageCountField")[0],
        pageSize: ctElement.getElementsByClassName("pdfjs-pageSizeField")[0],
        linearized: ctElement.getElementsByClassName(
          "pdfjs-linearizedField"
        )[0],
      },
    },
    annotationEditorParams: {
      editorFreeTextFontSize: ctElement.getElementsByClassName(
        "pdfjs-editorFreeTextFontSize"
      )[0],
      editorFreeTextColor: ctElement.getElementsByClassName(
        "pdfjs-editorFreeTextColor"
      )[0],
      editorInkColor: ctElement.getElementsByClassName(
        "pdfjs-editorInkColor"
      )[0],
      editorInkThickness: ctElement.getElementsByClassName(
        "pdfjs-editorInkThickness"
      )[0],
      editorInkOpacity: ctElement.getElementsByClassName(
        "pdfjs-editorInkOpacity"
      )[0],
    },
    printContainer: document.getElementsByClassName("pdfjs-printContainer")[0],
    openFileInput: document.getElementsByClassName("pdfjs-fileInput")[0],
    debuggerScriptPath: "./debugger.js",
  };
}

function webViewerLoad(blobUrl, hfDocumentDetailRef, _viewerCtId) {
  const viewerCtId = _viewerCtId ?? "outerContainer";
  const config = getViewerConfiguration(viewerCtId);

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
  if (blobUrl && hfDocumentDetailRef) {
    AppOptions.set("defaultUrl", blobUrl);
    PDFViewerApplication.hfDocumentDetailRef = hfDocumentDetailRef;
    PDFViewerApplication.loadingBar.hide();
  }
  PDFViewerApplication.run(config);
}

// Block the "load" event until all pages are loaded, to ensure that printing
// works in Firefox; see https://bugzilla.mozilla.org/show_bug.cgi?id=1618553
document.blockUnblockOnload?.(true);

if (!window.HybridForms) {
  document.addEventListener("DOMContentLoaded", webViewerLoad, true);
}

export {
  PDFViewerApplication,
  AppConstants as PDFViewerApplicationConstants,
  AppOptions as PDFViewerApplicationOptions,
};
