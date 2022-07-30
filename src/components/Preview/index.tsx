import React from 'react'
import styles from './index.scss'
import { PreviewProps } from "./index.types";


export const Preview = (props: PreviewProps) => {
  console.log(props)
  return (
    <div className={styles.Preview}>Preview</div>
  )
}
