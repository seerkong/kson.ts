(begin
    (var false_branch_visited false)
    (if (gt 2 3)
        (do
            5
        )
        (else_do
            (setenv false_branch_visited true)
        )
    )
    false_branch_visited
)