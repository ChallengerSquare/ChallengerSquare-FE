import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@components/Button/Button'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { useRecoilState } from 'recoil'
import { competitionForm } from '@pages/competitioncreation/store'
import styles from './CustomEditor.module.scss'

interface EditorProps {
  initialContent?: string
}

const CustomEditor = forwardRef(({ initialContent = '' }: EditorProps, ref) => {
  const editorRef = useRef<Editor>(null)
  const [formState, setFormState] = useRecoilState(competitionForm)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(initialContent)
    }
  }, [initialContent])

  const getMarkdown = () => {
    return editorRef.current?.getInstance().getMarkdown() || ''
  }

  const handleStore = () => {
    const markdown = getMarkdown()
    setFormState((prev) => ({
      ...prev,
      contestCreateRequestDto: {
        ...prev.contestCreateRequestDto,
        contestContent: markdown,
      },
    }))
    const now = new Date()
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    setSaveMessage(`임시저장되었습니다.(${formattedTime})`)
    setTimeout(() => setSaveMessage(null), 1500)
  }

  useImperativeHandle(ref, () => ({
    handleStore,
    getMarkdown,
  }))

  return (
    <>
      <div className={styles.btn}>
        {saveMessage && <div className={styles.saveMessage}>{saveMessage}</div>}
        <Button variation="pink" onClick={handleStore}>
          임시저장
        </Button>
      </div>
      <div className={styles.editor}>
        <Editor
          ref={editorRef}
          initialValue={initialContent}
          height="500px"
          initialEditType="wysiwyg"
          previewStyle="vertical"
          useCommandShortcut={true}
        />
      </div>
    </>
  )
})

export default CustomEditor
