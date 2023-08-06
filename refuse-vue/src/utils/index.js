import * as tf from '@tensorflow/tfjs'

// 把文件转成img对象
export function file2img(f) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 224;
            img.height = 224;
            img.onload = () => resolve(img);
        }
    })
}
// 把图片转成tensor，并且归一化
export function img2x(imgEl) {
    return tf.tidy(() => {
        return tf.browser.fromPixels(imgEl).toFloat().sub(255 / 2).div(255 / 2).reshape([1, 224, 224, 3]);
    })
}