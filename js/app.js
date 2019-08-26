let net = null;
let loading = false
const bt = $('#bt-predict')
async function app() {
  // console.log('Loading mobilenet..');
  // Load the model.
  net = await mobilenet.load();
  console.log('el model', net)
  bt.removeClass('is-loading')
  // const imgEl = document.getElementById('img_preview');
  // const result = await net.classify(imgEl);
  // console.log('el resilt', result)
}

if (!net) app();

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#img_preview').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}
$(() => {
	$("#txt_file").change(function() {
	  readURL(this);
	  return false
	});

	$('#bt-predict').on('click', async () => {
	  if (loading) {
	  	return false
	  }
	  loading = true
	  // const bt = $('#bt-predict')
	  const tbl = $('#tbl-results').find('tbody')
	  const txt = $('#lbl-prediction')
	  // const img = new Image()
	  const imgEl = document.getElementById('img_preview')
	  // img.src = imgEl.src
	  // img.width = 224
	  // img.height = 224
	  // tf.browser.fromPixels(document.getElementById('img_preview'));
	  console.log('el img element', imgEl)
	  const result = await net.classify(imgEl);
	  // const result = await classifier.predictClass(xlogits);
	  console.log('el result', result)
	  // txt.text(result[0].className)
	  let html = ``
	  result.forEach(v => {
	  	html += `<tr>
	       <td>${v.className}</td>
	       <td>${v.probability}</td>
	  	</tr>`
	  })
	  tbl.html(html)
	  bt.removeClass('is-loading')
	  loading = false
	  return false
	}) 
});