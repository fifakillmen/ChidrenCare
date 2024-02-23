package com.v1.ChildrenCare.AmazonTest;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.io.File;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.v1.ChildrenCare.service.StorageService;
import com.v1.ChildrenCare.service.serviceImpl.StorageServiceImpl;

public class StorageServiceImplTest {

    @Mock
    private AmazonS3 s3Client;

    private StorageService storageService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        storageService = new StorageServiceImpl(s3Client);
    }

    @Test
    public void testUploadFile() {
        MultipartFile multipartFile = new MockMultipartFile("test.txt", "Hello World".getBytes());

        String returnedFilename = storageService.uploadFile(multipartFile);

        assertEquals(returnedFilename, "test.txt");
    }

    @Test
    public void testDownloadFile() throws IOException {
        S3Object s3Object = mock(S3Object.class);
        S3ObjectInputStream inputStream = mock(S3ObjectInputStream.class);
        when(inputStream.read(any())).thenReturn(-1);
        when(s3Object.getObjectContent()).thenReturn(inputStream);
        when(s3Client.getObject("test-bucket", "file.txt")).thenReturn(s3Object);

        byte[] content = storageService.downloadFile("file.txt").getBytes();

        verify(s3Client).getObject("test-bucket", "file.txt");
        assertArrayEquals(new byte[0], content);
    }

    @Test
    public void testDeleteFile() {
        storageService.deleteFile("file.txt");

        verify(s3Client).deleteObject("test-bucket", "file.txt");
    }

//    @Test
//    public void getFileLink() {
//        when(s3Client.getUrl("test-bucket", "file.txt")).thenReturn(new URL("https://my-bucket.s3.amazonaws.com/file.txt"));
//
//        String url = storageService.getFileLink("file.txt");
//
//        assertEquals("https://my-bucket.s3.amazonaws.com/file.txt", url);
//    }

}