import Message from './Message'
import GroupChatMessage from './GroupChatMessage'
const ConversationBox = () => {
  return (
    <div className='h-[41vw] p-2 overflow-scroll scrollbar-hide'>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <GroupChatMessage></GroupChatMessage>
    </div>
  )
}

export default ConversationBox