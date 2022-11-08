const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: [true, 'A name is required'],
            unique: true,
            trim: true,
            maxlength: [60, 'name must be less than or equal 40'],
        },
        slug: String,
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Product must have a price']
        },
        discountPercentage: {
            type: Number,
            validate: function (value) {
                return value < 100 && value > 0
            },
            default: 23.5,
            message: 'Discount percentage must be lesser than 100 and greater than 0'
        },
        rating: {
            type: Number,
            default: 4.5,
            validate: {
                validator: function (val) {
                    return val < 5 && val > 0;
                },
                message:
                    'rating average {VALUE} must be lesser than 5 and grater than 0',
            },
        },
        thumbnail: {
            type: String,
            default: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

serviceSchema.pre('save', function (next) {
    this.slug = slugify(this.serviceName, { lower: true, strict: true });
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;