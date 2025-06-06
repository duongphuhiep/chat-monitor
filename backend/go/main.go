package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	SUPABASE_API_URL := os.Getenv("SUPABASE_API_URL")
	SUPABASE_ANON_KEY := os.Getenv("SUPABASE_ANON_KEY")
	// SUPABASE_SERVICE_ROLE_KEY := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	client, err := supabase.NewClient(SUPABASE_API_URL, SUPABASE_ANON_KEY, &supabase.ClientOptions{})
	if err != nil {
		panic(fmt.Sprintf("cannot initalize client %v", err))
	}
	session, err := client.SignInWithEmailPassword("minh@email.com", "aaaaaa")

	if err != nil {
		fmt.Printf("cannot sign in %v", err)
	} else {
		fmt.Printf("login success %s", session.AccessToken)
	}
}
