import React, { useEffect, useRef } from 'react'

const JitsiMeet = () => {
  const jitsiContainer = useRef(null)

  useEffect(() => {
    const api = new JitsiMeetExternalAPI('8x8.vc', {
      roomName:
        'vpaas-magic-cookie-98fdea46be62454b9dcfbe8b7ded2847/SampleAppEasyConveniencesMatterNonetheless',
      parentNode: jitsiContainer.current,
    })
  }, [])

  return (
    <div ref={jitsiContainer} style={{ height: '500px', width: '1000px' }} />
  )
}

export default React.memo(JitsiMeet)
