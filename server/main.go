package main

import (
	"uniwave/routes"
	_ "uniwave/utils" // This call's init() to load environment variables and initialize JWT secret
	_ "uniwave/config" // This call's init() to initialize Firebase app
)

func main() {
	r := routes.SetupRoutes()
	r.Run(":8080")
}
