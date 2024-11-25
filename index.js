const imgContainer = document.getElementById('imgcont')
const progressBar = document.getElementById('progress')
const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/a/a0/%22%2430_every_Thursday%22_pension_plan_out_as_President_discusses_political_situation_with_California_candidates._Washington%2C_D.C.%2C_Sept._27._Sheridan_Downey%2C_who_defeated_Senator_William_Gibbs_LCCN2016874059.jpg'

// "onprogress" callback.
function onProgressCallback(ratio) {
  if (ratio >= 0) {
    // We have progress ratio; update the bar.
    progressBar.value = ratio
  } else {
    // Ratio not computable. Let's make this bar an indeterminate one.
    progressBar.removeAttribute('value')
  }
}

// Start image load.
loadImage(imageUrl, onProgressCallback)
  .then((imgSrc) => {
    // Loading successfuly complete; set the image.
    imgContainer.src = imgSrc
  })
  .catch((xhr) => {
    // An error occured. We have the XHR object to see what happened.
  })
