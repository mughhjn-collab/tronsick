<?php
/** Server settings injected before JS — antibot + all admin site settings */
$__ab = [];
$__settings = [];
$__abPath = __DIR__ . '/data/antibot.json';
$__setPath = __DIR__ . '/data/site_settings.json';
if (is_file($__abPath)) {
    $__ab = json_decode(file_get_contents($__abPath), true) ?: [];
}
if (is_file($__setPath)) {
    $__settings = json_decode(file_get_contents($__setPath), true) ?: [];
}
$__abJson = json_encode($__ab, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);
$__setJson = json_encode($__settings, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);
?>
<script>
(function(){
  function applyStore(d, skipKeys){
    if(!d) return;
    skipKeys=skipKeys||['_saved','_updated'];
    Object.keys(d).forEach(function(k){
      if(skipKeys.indexOf(k)>=0) return;
      if(d[k]!=null) try{localStorage.setItem(k,String(d[k]));}catch(e){}
    });
  }
  var ab=<?= $__abJson ?>;
  var st=<?= $__setJson ?>;
  window._SITE_AB=ab||{};
  window._SITE_SETTINGS=st||{};
  if(ab&&String(ab._saved)==='1') applyStore(ab);
  if(st&&String(st._saved)==='1') applyStore(st);
  if(st&&String(st.maintenance_mode)==='1'&&(window.location.pathname||'').indexOf('/admin/')===-1){
    document.documentElement.classList.add('site-maintenance');
  }
})();
</script>
