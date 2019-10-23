// 게시글 테이블

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsTo(db.Product);
        db.Post.hasMany(db.Comment);
        
    }

    return Post;

}