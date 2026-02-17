import React from 'react'
import CategoryTable from './CategoryTable'
import AddCategory from './AddCategory'

const Page: React.FC = () => {
    return (
        <div>
            <AddCategory />
            <CategoryTable />
        </div>
    )
}

export default Page