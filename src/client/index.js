import { handleSubmit } from './js/application'
import { checkDate } from './js/checkdate'

document.getElementById('generate').addEventListener('click', handleSubmit)

export { handleSubmit}
export { checkDate}

import './styles/base.scss'
import './styles/button.scss'
import './styles/form.scss'