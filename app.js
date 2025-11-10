import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Doğrudan MP4 video URL'i kullanın (embed URL değil!)
// Bunny Stream'den videonun doğrudan MP4 linkini alın
const AD_VIDEO_URL = "https://vz-7335a66b-be3.b-cdn.net/dee86846-9223-4695-9ba5-42bea20c47db/playlist.m3u8";

// CORS ayarları (reklam player'lar için gerekli)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// VAST XML üretimi
app.get("/vast.xml", (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<VAST version="3.0">
  <Ad id="1">
    <InLine>
      <AdSystem>SimpleNodeVAST</AdSystem>
      <AdTitle>My Advertisement</AdTitle>
      <Impression><![CDATA[https://example.com/track/impression]]></Impression>
      <Creatives>
        <Creative id="1" sequence="1">
          <Linear>
            <Duration>00:00:04</Duration>
            <TrackingEvents>
              <Tracking event="start"><![CDATA[https://example.com/track/start]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[https://example.com/track/firstQuartile]]></Tracking>
              <Tracking event="midpoint"><![CDATA[https://example.com/track/midpoint]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[https://example.com/track/thirdQuartile]]></Tracking>
              <Tracking event="complete"><![CDATA[https://example.com/track/complete]]></Tracking>
            </TrackingEvents>
            <VideoClicks>
              <ClickThrough><![CDATA[https://example.com]]></ClickThrough>
            </VideoClicks>
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

// Test endpoint
app.get("/", (req, res) => {
  res.send(`
    <h1>VAST Server Çalışıyor</h1>
    <p>VAST URL: <a href="/vast.xml">/vast.xml</a></p>
    <p>Bu URL'i Bunny Stream'e ekleyin</p>
  `);
});

app.listen(PORT, () => {
  console.log(`VAST server çalışıyor → http://localhost:${PORT}/vast.xml`);
});