// Stitchers country setup. Each country has its own database.
// Every page loads this file first, then uses window.STITCHERS for its connection.
(function () {
  var COUNTRIES = {
    US: {
      label: 'United States',
      url: 'https://juyljsaqqkymtfvlftgo.supabase.co',
      anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eWxqc2FxcWt5bXRmdmxmdGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTgzNDEsImV4cCI6MjEwNzU3NDM0MX0.3ZU35hBkfctK085y7160peLDqNxkzoo97hVumd06fuo'
    },
    CA: {
      label: 'Canada',
      url: 'https://kupxytgwusgumnejfhiz.supabase.co',
      anon: 'sb_publishable_NrSotS-sPT2dV-tWyb4WQQ_HZDiK-vJ'
    }
  };
  var saved = localStorage.getItem('stitchers_country');
  var code = COUNTRIES[saved] ? saved : null;
  var active = COUNTRIES[code || 'US'];
  window.STITCHERS = {
    country: code,
    countries: COUNTRIES,
    label: code ? COUNTRIES[code].label : null,
    url: active.url,
    anon: active.anon
  };
})();
