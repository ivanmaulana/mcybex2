<?php
    header('Access-Control-Allow-Origin: *');



    //open connection to mysql db
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $search = $_GET['search'];

    $sql = "SELECT id_artikel, judul_artikel, isi_artikel, tanggal, nama_user_input, total_baca, total_komentar FROM artikel_view WHERE is_remove='N' AND isi_artikel LIKE '%$search%' ORDER BY id_artikel DESC LIMIT 20";

    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($connection);




?>
