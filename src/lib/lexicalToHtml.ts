import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

export async function renderLexical(
  content: SerializedEditorState<SerializedLexicalNode>,
): Promise<string> {
  if (!content) return ''
  return convertLexicalToHTML({ data: content })
}
