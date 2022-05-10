(begin
    (var true_branch_visited false)
    (if (gt 2 3)
        (setenv true_branch_visited true)
    )
    true_branch_visited
)