/**
 * Loads an image with progress callback.
 *
 * `onprogress` callback will be called by XMLHttpRequest's "onprogress"
 * event, and will receive the loading progress ratio as an whole number
 * (0 to 100). If progress ratio isn't computable, `onprogress` will be
 * called once, passing `-1` as progress value (this is useful to e.g.
 * set progress bar animation to indeterminate).
 *
 * @param {string} imageUrl The image URL to load
 * @param {Function} onprogress
 * @return {Promise}
 */
function loadImage(imageUrl, onprogress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let notifiedNotComputable = false

    xhr.open('GET', imageUrl, true)
    xhr.responseType = 'arraybuffer'

    xhr.onprogress = function (ev) {
      if (ev.lengthComputable) {
        onprogress(parseInt((ev.loaded / ev.total) * 100))
      } else {
        if (!notifiedNotComputable) {
          notifiedNotComputable = true
          onprogress(-1)
        }
      }
    }

    xhr.onloadend = function () {
      if (!xhr.status.toString().match(/^2/)) {
        reject(xhr)

        return
      }

      const options = {}
      const headers = xhr.getAllResponseHeaders()
      const m = headers.match(/^Content-Type\:\s*(.*?)$/im)

      if (m && m[1]) {
        options.type = m[1]
      }

      resolve(window.URL.createObjectURL(new Blob([this.response], options)))
    }

    xhr.send()
  })
}
