import React from 'react'
import styles from './preview.scss'
import { PreviewProps } from "./types";
export const Preview = (props: PreviewProps) => {
  console.log(props)
  return (
    <div className={styles.Preview}>Preview</div>
  )
}
