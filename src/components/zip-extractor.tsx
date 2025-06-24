import { ReactElement, useEffect } from 'react';
import { BbbPluginSdk, pluginLogger, PresentationToolbarButton } from 'bigbluebutton-html-plugin-sdk';

interface ZipExtractorProps {
  uuid: string;
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || '';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function ZipExtractor(props: ZipExtractorProps): ReactElement {
  const { uuid } = props;
  BbbPluginSdk.initialize(uuid);
  const pluginApi = BbbPluginSdk.getPluginApi(uuid);
  const {
    data: presentationData,
  } = pluginApi.useCurrentPresentation();
  useEffect(() => {
    pluginLogger.info(JSON.stringify(presentationData));
    pluginApi.setPresentationToolbarItems([]);
    if (presentationData?.currentPage?.urlsJson?.text) {
      fetch(presentationData?.currentPage.urlsJson.text).then(
        (value) => value.text(),
      ).then((text) => {
        const match = text.match(/https?:\/\/[^\s'"<>]+\/([^/\s'"<>]+\.zip)\b/i);
        if (match) {
          const fileUrl = match[0];
          const fileName = match[0];
          pluginApi.setPresentationToolbarItems([
            new PresentationToolbarButton({
              tooltip: 'Click to download the zip from the presentation',
              onClick: () => {
                downloadFile(fileUrl, fileName);
              },
              label: 'Download the zip',
              style: {},
            }),
          ]);
        }
      });
    }
  }, [presentationData]);
  return null;
}
