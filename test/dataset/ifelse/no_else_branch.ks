(begin
    (var true_branch_visited false)
    (if (gt 5 3)
        (do
            (setenv true_branch_visited true)
        )
    )
    true_branch_visited
)