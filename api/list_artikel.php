<?php
 //open connection to mysql db
	header('Access-Control-Allow-Origin: *');
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "SELECT id_artikel, id_kategori, id_topik, id_komoditas, judul_artikel, tanggal,nama_user_input FROM artikel_view WHERE id_kategori=1 AND is_remove='N' ORDER BY id_artikel DESC";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_array($result))
    {
        $emparray[] = $row;
        
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($connection);
  

?>