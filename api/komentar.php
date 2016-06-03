<?php
    header('Access-Control-Allow-Origin: *');



 //open connection to mysql db
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    $id_artikel = $_GET['idartikel'];


    //fetch table rows from mysql db
    $sql = "SELECT id_artikel, isi_komentar, tanggal_komentar, nama_user FROM `artikel_komentar_view` WHERE id_artikel = '$id_artikel' ORDER BY id_kategoriuser";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
    //$res1 =  escapeJsonString($res);
    //echo $res;

    //close the db connection
    mysqli_close($connection);




?>
