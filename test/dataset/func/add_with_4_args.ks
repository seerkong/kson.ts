(begin
    (func add4args [a, b, c, d]
        (var x (add a b))
        (var y (add c d))
        (add x y)
    )
    (add4args 1 2 3 4)
)