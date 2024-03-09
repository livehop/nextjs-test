import TopNav from '@/components/kaizenjournal/TopNav';
import React from 'react'

const KaizenLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="min-h-full">
                <TopNav />
                <>
                    {children}
                </>
            </div>
        </>
    )
}

export default KaizenLayout