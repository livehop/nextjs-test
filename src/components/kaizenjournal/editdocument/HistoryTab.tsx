import { Note } from '@/infra/models/Note';
import { useStore } from '@/infra/stores/Store'
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite'
import React, { use, useEffect, useState } from 'react'

const HistoryTab = () => {
    const { kaizenStore } = useStore();
    const { getNotes, notes } = kaizenStore;
    const [myNotes, setMyNotes] = useState<Note[]>([])

    useEffect(() => {
        getNotes().then((mynotes) => {
            console.log(toJS(mynotes));
            if (mynotes)
                setMyNotes(toJS(mynotes));
        });
    }, [])



    return (
        <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Logs
                    </label>
                    {notes && notes.map(note => (
                        <div key={note.id} className='pl-2 pt-2 border-grey-100 border-b-gray-500 border-2'>
                            <p>[{note.inscritDate.split("T")[0]}] : {note.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>

        </div >

    )
}

export default observer(HistoryTab)