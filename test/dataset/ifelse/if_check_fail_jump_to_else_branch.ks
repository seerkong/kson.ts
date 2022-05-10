(begin
    (var false_branch_visited false)
    (if (gt 2 3)
        5
    else
        (setenv false_branch_visited true)
    )
    false_branch_visited
)