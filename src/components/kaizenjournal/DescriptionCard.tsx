import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import React from 'react'
import { Button } from '../ui/button';

type DescriptionProps = {
    data: string;
}

const DescriptionCard = ({ data }: DescriptionProps) => {
    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link">{data}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <div className="bg-grey-500 flex justify-between space-x-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@nextjs</h4>
                            <p className="text-sm">
                                The React Framework – created and maintained by @vercel.
                            </p>
                            <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground">
                                    Joined December 2021
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </>

    )
}

export default DescriptionCard