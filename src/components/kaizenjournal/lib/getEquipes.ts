import React from 'react'
import { Option } from '../hooks/useOptionFilter'

const getEquipes = () => {
    const options: Option[] = [
        {
            label: 'Titan',
            value: 'Titan'
        },
        {
            label: 'C-L-Production',
            value: 'C-L-Production'
        },
        {
            label: 'Forge',
            value: 'Forge'
        },
        {
            label: 'FAN-AFO',
            value: 'FAN-AFO'
        },
        {
            label: 'Pro-Production',
            value: 'Pro-Production'
        }
    ];
    return options;
}

export default getEquipes