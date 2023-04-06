import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "온준형",
        comment: "안녕하세요, 온준형입니다.",
    },
    {
        name: "온준형",
        comment: "반갑습니다, 온준형입니다.", 
    },
    {
        name: "온준형",
        comment: "처음 뵙겠습니다, 온준형입니다.",
    }
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={star.name} comment={comment} />
                )
            })}
        </div>
    );
}
export default CommentList;