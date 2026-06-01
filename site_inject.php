<?php
/** Inline server settings — antibot available before any JS runs */
$__ab = [];
$__abPath = __DIR__ . '/data/antibot.json';
if (is_file($__abPath)) {
    $__ab = json_decode(file_get_contents($__abPath), true) ?: [];
}
$__abJson = json_encode($__ab, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);
?>
<script>
(function(){
  var d=<?= $__abJson ?>;
  window._SITE_AB=d||{};
  if(d&&String(d._saved)==='1'){
    ['ab1_on','ab1_amount','ab1_mode','ab2_on','ab2_amount','ab2_wins','ab3_on'].forEach(function(k){
      if(d[k]!=null) try{localStorage.setItem(k,String(d[k]));}catch(e){}
    });
  }
})();
</script>
