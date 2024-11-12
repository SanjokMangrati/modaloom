import React from 'react'

const AvatarLivePreviewComponent = ({ svg }: { svg: string }) => {
    return (
        <div className="bg-svgBackground w-80 h-80 flex justify-center items-center" dangerouslySetInnerHTML={{ __html: svg }} />

    )
}

export default AvatarLivePreviewComponent