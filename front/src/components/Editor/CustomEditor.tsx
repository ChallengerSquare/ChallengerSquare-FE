import React, { useRef, useEffect } from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import styles from './CustomEditor.module.scss'

interface EditorProps {
  initialContent?: string
  onGetMarkdown: (markdown: string) => void // onGetMarkdown prop 추가
}

const CustomEditor = ({ initialContent = '여기에 입력해주세요.', onGetMarkdown }: EditorProps) => {
  const editorRef = useRef<Editor>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(initialContent)
    }
  }, [initialContent])

  const getMarkdown = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || ''
    onGetMarkdown(markdown) // onGetMarkdown 콜백 호출하여 텍스트 내용 전달
  }

  return (
    <div className={styles.editor}>
      <Editor
        ref={editorRef}
        initialValue={initialContent}
        height="500px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        useCommandShortcut={true}
        onChange={getMarkdown} // 텍스트 변경 시 getMarkdown 호출
      />
    </div>
  )
}

export default CustomEditor
