import { PropsWithChildren } from 'react'

import '@nutui/nutui-react-taro/dist/style.css'
import './tailwind.css'
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  return children
}

export default App
