import React from 'react'

const UserProfilePage = (props) => {
    return (
        <div>
            
        </div>
    )
}

export default UserProfilePage

export const getServerSideProps = async (ctx) => {
    const { params, req, res } = ctx
    const user = await ctx.store.user.getUser(id)
    return {
        props: {
            user
        }
    }
}
