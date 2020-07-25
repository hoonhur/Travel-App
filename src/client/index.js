import { handleSubmit } from './js/application'
import { cleartripSubmit } from './js/application'
import { checkDate } from './js/checkdate'

document.getElementById('generate').addEventListener('click', handleSubmit)
document.getElementById('clearTrip').addEventListener('click', cleartripSubmit)

export { handleSubmit }
export { cleartripSubmit }
export { checkDate }

import './styles/base.scss'
import './styles/button.scss'
import './styles/form.scss'