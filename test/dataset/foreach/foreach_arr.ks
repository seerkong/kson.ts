(begin
    (var a [1, 2, 3])
    (var b 0)
    (foreach x in a
        (writeln x)
        (setenv b x)
    )
    b
)