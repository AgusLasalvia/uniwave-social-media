package services

import (
	"context"
	"fmt"
	"mime/multipart"
	"uniwave/config"

	"github.com/minio/minio-go/v7"
)

// Sube un archivo dentro de "carpeta" del usuario
func UploadUserFile(userID string, fileHeader *multipart.FileHeader) (string, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	objectName := fmt.Sprintf("%s/%s", userID, fileHeader.Filename)

	_, err = config.MinioClient.PutObject(
		context.Background(),
		"avatars", // nombre del bucket
		objectName,
		file,
		fileHeader.Size,
		minio.PutObjectOptions{ContentType: fileHeader.Header.Get("Content-Type")},
	)
	if err != nil {
		return "", err
	}

	return objectName, nil
}
