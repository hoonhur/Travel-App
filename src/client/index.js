import { handleSubmit } from './js/application'
import { cleartripSubmit } from './js/application'

document.getElementById('generate').addEventListener('click', handleSubmit)
document.getElementById('clearTrip').addEventListener('click', cleartripSubmit)

export { handleSubmit }
export { cleartripSubmit }

import './styles/base.scss'
import './styles/button.scss'
import './styles/form.scss'