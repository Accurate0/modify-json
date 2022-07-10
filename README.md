# modify-json

modifies a json file with key nesting

## Inputs

## `__inputFile`

**Required** Input JSON file

## `__outputFile`

**Required** Output JSON file location

## Dynamic Keys

**Optional** 

### Key
snake case is converted to camel case, client_id -> clientId

`__` is used for object key nesting

### Value
attempts to parse as JSON, falls back to value as is.

### Examples

client_id -> `{ clientId: value }`

service_account__account_name -> `{ serviceAccount: { accountName: value } }`

## Example usage
```
- uses: Accurate0/modify-json@main
  with:
    __inputFile: ./config.json
    __outputFile: ./base-config.json
    api_key: ${{ secrets.API_CONFIG_API_KEY }}
    client_id: ${{ secrets.API_CONFIG_CLIENT_ID }}
    client_secret: ${{ secrets.API_CONFIG_CLIENT_SECRET }}
    sensor_data: ${{ secrets.API_CONFIG_SENSOR_DATA }}
    service_account__account_name: ${{ secrets.API_CONFIG_SERVICE_ACCOUNT_NAME }}
    service_account__login_username: ${{ secrets.API_CONFIG_SERVICE_USERNAME }}
    service_account__login_password: ${{ secrets.API_CONFIG_SERVICE_PASSWORD }}
```
