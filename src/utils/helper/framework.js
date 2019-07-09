import axios from 'axios'

export default {
    install(Vue) {

        window.fw = function() {

        }


        fw.getCategory = async function(param) {

            try {
                const result = await axios.post('/api/ajax/CategoryData', param);

                return result.data

            } catch (err) {


            }
        }


    }
}