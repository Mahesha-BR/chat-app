import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../library/utils';

const ChatContainer = ( { selectedUser, setSelectedUser } ) =>
{

  const scrollEnd = useRef();
  const currentUserId = '680f50e4f10f3cd28382ecf9'; // Your ID for sent messages

  useEffect( () =>
  {
    if ( scrollEnd.current )
    {
      scrollEnd.current.scrollIntoView( { behavior: "smooth" } );
    }
  }, [] );

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*----header---- */ }
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={ assets.profile_martin } alt="" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin Johnson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={ () => setSelectedUser( null ) } src={ assets.arrow_icon }
          alt="" className='md:hidden max-w-7 cursor-pointer' />
        <img src={ assets.help_icon } alt="" className='hidden md:block max-w-5' />
      </div>

      {/*-------chat area------ */ }
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        { messagesDummyData.map( ( msg, index ) =>
        {
          const isCurrentUser = msg.senderId === currentUserId;

          return (
            <div
              key={ index }
              className={ `flex flex-col items-${ isCurrentUser ? 'end' : 'start' } mb-5 w-full` }
            >
              <img
                src={ isCurrentUser ? assets.avatar_icon : assets.profile_martin }
                alt="User"
                className="w-6 h-6 rounded-full mb-1"
              />
              <div className={ `max-w-[70%] flex flex-col gap-1 ${ isCurrentUser ? 'items-end' : 'items-start' }` }>
                { msg.image ? (
                  <img
                    src={ msg.image }
                    alt=""
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
                  />
                ) : (
                  <div
                    className={ `p-3 text-sm font-light rounded-lg text-white whitespace-pre-wrap break-words ${ isCurrentUser
                        ? 'bg-violet-500/30 rounded-br-none text-right'
                        : 'bg-gray-700 rounded-bl-none text-left'
                      }` }
                  >
                    { msg.text }
                  </div>
                ) }
                <div className="text-xs text-gray-400">
                  { formatMessageTime( msg.createdAt ) }
                </div>
              </div>
            </div>
          );
        } ) }
        <div ref={ scrollEnd }></div>
      </div>

      {/*---------bottom area-------- */ }
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/20'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full relative'>
          <input
            type="text"
            placeholder='Send a message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white 
             placeholder-gray-400 bg-transparent'
          />
          <input type="file" id="image" accept='image/png,image/jpeg' hidden />
          <label htmlFor="image" className='absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer'>
            <img src={ assets.gallery_icon } alt="" className='w-5 mr-2.5 cursor-pointer' />
          </label>
          <img src={ assets.send_button } alt="Send" className='w-7 cursor-pointer' />
        </div>

      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden p-4 rounded">
      <img src={ assets.logo_icon } className="w-16 h-16 object-contain" alt="App Logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
