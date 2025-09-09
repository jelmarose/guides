# Nest JS

## Controller
```node
import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductsController {
	@Get()
	findAll(): string {
		return 'This action returns all products';
	}

	// Will match 'abcd/', 'abcd/123', 'abcd/abc', etc.
	@Get('abcd/*')
	findAll() {
		return 'This route uses a wildcard';
	}

	@Post()
	@HttpCode(204)
	create(){
		return 'This action adds a new product';
	}
}
```