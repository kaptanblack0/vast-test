import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Reklam MP4 URL'in
const AD_VIDEO_URL = "https://player.mediadelivery.net/embed/534210/dee86846-9223-4695-9ba5-42bea20c47db";

// VAST XML üretimi
app.get("/vast.xml", (req, res) => {
 const xml = `<?xml version="1.0" encoding="UTF-8"?>
<VAST version="3.0">
  <Ad id="1">
    <InLine>
      <AdSystem>SimpleNodeVAST</AdSystem>
      <AdTitle>My Ad</AdTitle>
      <Impression><![CDATA[https://example.com/track/impression]]></Impression>
      <Creatives>
        <Creative>
          <Linear>
            <Duration>00:00:04</Duration>
            <MediaFiles>
              <MediaFile delivery="progressive" type="video/mp4" width="1920" height="1080" scalable="true" maintainAspectRatio="true">
                <![CDATA[${AD_VIDEO_URL}]]>
              </MediaFile>
            </MediaFiles>
          </Linear>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>`;

  res.set("Content-Type", "application/xml");
  res.send(xml);
});

app.listen(PORT, () => {
  console.log(`VAST saasçalışıyor → http://localhost:${PORT}/vast.xml`);
});
