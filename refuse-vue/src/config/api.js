const baseURL ='http://127.0.0.1:3000/api'
const DATA_URL = 'http://127.0.0.1:8081/'
export default {
    search: baseURL + '/refusecategory',
    modelPath: DATA_URL + '/model.json',
    classesPath: DATA_URL + '/classes.json'
}