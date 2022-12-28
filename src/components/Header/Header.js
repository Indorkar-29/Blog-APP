import React from 'react'
import CreateBlog from '../CreateBlog/CreateBlog'

const Header = () => {
  return (
    <div>
        <button onClick={<CreateBlog/>}>Create Post</button>
    </div>
  )
}

export default Header;